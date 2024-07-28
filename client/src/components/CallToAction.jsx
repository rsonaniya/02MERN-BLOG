import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl">Want to see more projects like this?</h2>
        <p className="text-gray-500 my-2">Checkout these resources </p>
        <Button
          className="rounded-tl-xl rounded-bl-none"
          gradientDuoTone="purpleToPink"
        >
          See More On Github
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Stack_9437df2ba9_62af1dd3fc.png"
          alt="imjjj"
        />
      </div>
    </div>
  );
};

export default CallToAction;
