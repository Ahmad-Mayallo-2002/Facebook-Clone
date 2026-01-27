import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

export function IsEmailOrPhone(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEmailOrPhone',
            target: object.constructor,
            propertyName,
            validator: {
                validate(value: any) {
                    if (typeof value !== 'string') return false;

                    const emailRegex = /^[^\s@]+[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^\+?[0-9]{10,15}$/;

                    return emailRegex.test(value) || phoneRegex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid email or phone number`
                },
            }
        })
    }
}