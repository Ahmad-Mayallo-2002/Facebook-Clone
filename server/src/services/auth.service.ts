import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthInput, RegisterInput } from '../graphql/inputs/auth.input';
import { config } from 'dotenv';
import { compare, hash } from 'bcryptjs';
import { emailQueue } from '../bullmq/queues/email.queue';
import { emailWorker } from '../bullmq/worker/email.worker';
import { Roles } from '../enums/roles.enum';
import { Gender } from '../enums/gender.enum';
import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { queueRedis } from '../redis/queue.redis';
import { getRepo } from '../utils/getRepo';
import { Payload } from '../interfaces/payload.interface';

config();

const { ACCESS_TOKEN_SECRET, ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

@Service()
export class AuthService {
    private userRepo = getRepo<User>(User);

    async register(input: RegisterInput): Promise<User> {
        const existing = await this.userRepo.findOne({ where: { email: input.email } });
        if (existing) throw new Error('Email is already used');

        const hashedPassword = await hash(input.password, 10);

        const user = this.userRepo.create({
            username: input.username,
            email: input.email,
            password: hashedPassword,
            gender: input.gender,
        });

        return await this.userRepo.save(user);
    }

    async login(input: AuthInput): Promise<Payload> {
        const user = await this.userRepo.findOne({ where: { email: input.email } });
        if (!user) throw new Error('Invalid email');

        const isValid = await compare(input.password, user.password);
        if (!isValid) throw new Error('Invalid password');

        const payload = {
            id: user.id,
            role: user.role,
        };

        const accessToken = sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: '1h' });
        return {
            token: accessToken,
            ...payload
        };
    }

    async forgotPassword(email: string): Promise<string> {
        await emailQueue.add('send-verification-code', {
            email
        }, {
            attempts: 5,
            backoff: { type: 'exponential', delay: 5000 }
        });
        emailWorker.run();
        return `Verification code sent to ${email}`;
    }

    async verifyCode(code: string): Promise<string> {
        const email = await queueRedis.get(code);
        if (!email) throw new Error('Verification code expired or not found');
        await queueRedis.del(code);
        return email;
    }

    async resetPassword(email: string, newPassword: string, confirmPassword: string): Promise<boolean> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        if (newPassword !== confirmPassword) throw new Error('Passwords do not match');

        const hashedPassword = await hash(newPassword, 10);
        user.password = hashedPassword;

        await this.userRepo.save(user);

        return true;
    }

    async seedAdmin(): Promise<boolean> {
        const admin = await this.userRepo.findOne({ where: { role: Roles.ADMIN } });
        if (admin) throw new Error('Admin is already exist');

        const newAdmin = this.userRepo.create({
            username: `${ADMIN_USERNAME}`,
            email: `${ADMIN_EMAIL}`,
            password: `${ADMIN_PASSWORD}`,
            role: Roles.ADMIN,
            gender: Gender.MALE
        });

        await this.userRepo.save(newAdmin);
        return true;
    }
} 