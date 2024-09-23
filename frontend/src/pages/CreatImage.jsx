import React from "react";

const CreatImage = () => {
    return (
        <section className=" fixed w-full backdrop-blur-[6px] bg-black/15 h-[100vh] font-sans z-1020">
            <div className="flex w-[800px] flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className="w-full bg-white rounded-lg border h-[90vh] shadow-md mt-[20px] overflow-scroll">
                    <div className="flex justify-end">
                        <p
                            className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                            onClick={props.click}
                        >
                            x
                        </p>
                    </div>
                    <div class="flex flex-col justify-center p-4">
                        <h1 className="text-[32px] font-extrabold font text-[#222328] ">
                            Create
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Create imaginative and visually stunning images with{" "}
                            <span className="text-slate-800">DALL-E</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreatImage;
