import React from "react";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import quiz from "../assets/quiz.png";
import note from "../assets/note.png";
const Notes = (props) => {
    const [upload, setUpload] = useState(true);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const[imgData,setImgData]=useState(null)
    const formData = new FormData();
    const handleImageUpload = (uploadedImage) => {
        setImage(uploadedImage);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImgData(event.target.files[0])
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
            setUpload(false);
        };

        reader.readAsDataURL(file);
    };
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', imgData);
      
        console.log(formData)
        const res = await fetch("http://192.168.0.106:8080/public/upload", {
            method: "POST",
            body: formData,
        });
        const data=await res.json();
        console.log(data)
        setText(data.text)
        setUpload(true)
    };
    return (
        <section className=" fixed w-full backdrop-blur-[6px] bg-black/15 h-screen font-sans z-1020">
            <div className="flex w-[800px] flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className="w-full bg-white rounded-lg border shadow mt-[100px] ">
                    <div className="flex justify-end">
                        <p
                            className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                            onClick={props.click}
                        >
                            x
                        </p>
                    </div>
                    <div class="flex flex-col justify-center p-4 mb-2">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl flex justify-center">
                            <span class="text-blue-700 px-2 font-bold">AI</span>
                            {} Text Extractor Tool
                        </h1>
                        <h2 class="text-gray-600 font-semibold flex justify-center ">
                            Upload image with text (handwritten or typed) and
                            extract the text
                        </h2>
                        {upload ? (
                            <div class="flex items-center justify-center w-4/5 h-1/6 p-10">
                                <label
                                    for="dropzone-file"
                                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200  hover:bg-gray-300 "
                                >
                                    <div class="flex flex-col items-center justify-center pt-4 pb-4">
                                        <svg
                                            class="w-8 h-8 mb-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500">
                                            <span class="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            JPEG, JPG or PNG
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        name="myImage"
                                        accept="image/png, image/jpg, image/jpeg"
                                        class="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        ) : (
                            <div class="flex flex-col justify-center p-2 m-2">
                                <img class="size-96" src={image} alt="image" />
                                <button class="border p-1 mt-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 w-1/6 flex justify-center" onClick={handleUpload}>
                                    Upload
                                </button>
                            </div>
                        )}
                    </div>
                    <div class=" p-2 m-2 border border-gray-300 text-gray-700 font-semibold bg-gray-100 h-[800px] overflow-scroll">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]} >
                        {text}
                    </ReactMarkdown>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notes;
