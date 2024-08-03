import CallToAction from "../components/CallToAction";
const Projects = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">
        Welcome to our Projects page, where we proudly showcase our web
        development work using the MERN stack. Here, you'll find a collection of
        dynamic and responsive web applications that demonstrate our expertise
        in MongoDB, Express.js, React, and Node.js. Each project highlights our
        commitment to creating robust, scalable, and user-friendly solutions.
        Dive in to explore how we leverage the power of MERN to bring innovative
        ideas to life and drive digital transformation.
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
