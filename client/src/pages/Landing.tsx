import { features, values } from "@/assets/assets";
import { FooterLanding } from "@/components/footers/FooterLanding";
import HeaderLanding from "@/components/headers/HeaderLanding";

export default function Landing() {
  return (
    <>
      <HeaderLanding />

      <section className="hero py-28 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col md:flex md:flex-col md:justify-center flex-row md:text-start text-center">
              <h1 className="text-gray-900 lg:text-6xl md:text-4xl text-3xl leading-[1.2]">
                Connect with friends and the world <br /> around you
              </h1>

              <p className="text-gray-500 mb-4 mt-3">
                Share moments, stay connected, and discover what matters most to
                you. Join millions of people sharing their lives on Facebook.
              </p>

              <div className="button-group flex gap-4 md:justify-start justify-center">
                <a
                  href="/signup"
                  className="main-button shadow-lg text-white border-2 border-blue-700 bg-blue-700 hover:bg-blue-800 hover:border-blue-800 duration-200"
                >
                  Create New Account
                </a>
                <a
                  href="/login"
                  className="main-button shadow-lg bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white duration-200"
                >
                  Login
                </a>
              </div>
            </div>

            <div className="col">
              <img
                className="rounded-xl shadow-lg"
                src="https://public.readdy.ai/ai/img_res/e48cd5c8aefb2996da6f78a44d8974ba.jpg"
                alt="Social"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features py-16 bg-white">
        <div className="container">
          <h3 className="text-center text-gray-900 text-4xl mb-4">
            Why people love Facebook
          </h3>
          <p className="text-center text-gray-600 mb-6">
            Everything you need to stay connected with the people who matter
            most
          </p>

          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {features.map((feature) => (
              <div
                className={`col p-6 text-center duration-200 rounded-xl`}
                key={feature.title}
              >
                <div
                  className="icon mx-auto w-fit p-4 rounded-full"
                  style={{ backgroundColor: feature.iconBackground }}
                >
                  <feature.icon
                    className={`text-3xl`}
                    style={{ color: feature.iconColor }}
                  />
                </div>
                <h4 className="my-2 text-lg text-gray-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container grid gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {values.map((v) => (
            <div className="col text-center" key={v.title}>
              <h3 className="text-4xl">{v.value}</h3>
              <p>{v.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="start py-12">
        <div className="container">
          <h3 className="text-center text-4xl text-gray-900">
            Ready to get started?
          </h3>
          <p className="text-center mt-4 mb-6 text-gray-500">
            Join Facebook today and start connecting with friends and family
          </p>
          <a
            href="/signup"
            className="main-button shadow-lg mx-auto block w-fit text-white bg-blue-700 hover:bg-blue-800 duration-200"
          >
            Create Your Account
          </a>
        </div>
      </section>

      <FooterLanding />
    </>
  );
}
