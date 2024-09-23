import React from "react";
import { useState } from "react";
import {
    pdf,
    Document,
    Page,
    Text,
    View,
    PDFViewer,
} from "@react-pdf/renderer";
import axios from "axios";
import Pdf from "../assets/pdf.png";
import { StyleSheet } from "@react-pdf/renderer";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const PdfSave = () => {
    const navigate = useNavigate();
    const {
        signedIn,
        user,
        subjects,
        topics,
        curUser,
        getData,
        curData,
        handleLogout,
        curTopic,
        addSubject,
        addTopics,
        setQuizData,
        quizData,
        pdfText,
        setPdfText,url
    } = useContext(userContextProvider);
    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "#7ec8e3",
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });
    const [loaded, setLoaded] = useState(false);
    const [pdfLink, setPdfLink] = useState("");
    const [fileName, setFileName] = useState("");
    const MyPDFDocument = () => (
        <Document>
            {pdfText.map((element, index) => (
                <Page key={index} size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>{element}</Text>
                    </View>
                </Page>
            ))}
        </Document>
    );
    // http://192.168.0.106:8080/public/save/upload
    const generatePDF = async ({ text }) => {
        console.log(pdfText);
        const blob = await pdf(<MyPDFDocument />).toBlob();
        console.log(blob);
        const file = new File([blob], `${fileName}.pdf`, {
            type: "application/pdf",
        });
        const formData = new FormData();
        console.log(file);
        formData.append('fileName',`${fileName}`)
        formData.append("file", file);
        formData.append("email", `${user.email}`);
        formData.append("subject", `${curTopic.subject}`);
        formData.append("topic", `${curTopic.topic}`);
        console.log(formData);
        try {
            const response = await axios.post(
                `http://${url}/public/save/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            getData(user.email)
            setPdfLink(
                "https://firebasestorage.googleapis.com/v0/b/aicademy-48d6c.appspot.com/o/0dfa5e9a-d647-44c9-abc4-46fa020d1cfd.pdf?alt=media"
            );
            setLoaded(true);

            console.log("success");
        } catch (error) {
            console.log(error);
        }
    };
    const click = () => {
        navigate("/");
    };
    const handleNameChange = (e) => {
        setFileName(e.target.value);
    };
    return (
        <div>
            {signedIn ? (
                <section className="fixed top-0 left-0 backdrop-blur-[7px] bg-blue-800/20 h-screen w-full  font-sans z-10">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="flex justify-end">
                                <p
                                    className="px-4  text-gray-600 text-[20px] cursor-pointer hover:text-gray-900 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100"
                                    onClick={click}
                                >
                                    x
                                </p>
                            </div>
                            {loaded ? (
                                <div className="flex flex-col items-center mb-8 mt-5">
                                    <a
                                        href="https://firebasestorage.googleapis.com/v0/b/aicademy-48d6c.appspot.com/o/0dfa5e9a-d647-44c9-abc4-46fa020d1cfd.pdf?alt=media"
                                        target="_blank"
                                    >
                                        <img
                                            src={Pdf}
                                            alt="Image description"
                                        />
                                    </a>
                                </div>
                            ) : (
                                <div class="flex flex-col justify-center p-4">
                                    <div>
                                        <label
                                            for="fileName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            File Name
                                        </label>
                                        <input
                                            name="fileName"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-2/4 p-2.5"
                                            placeholder="YourPdf"
                                            value={fileName}
                                            onChange={handleNameChange}
                                            required={true}
                                        />
                                        <button
                                            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold my-3 p-2 rounded-md"
                                            onClick={generatePDF}
                                        >
                                            Create Pdf
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                navigate('/signin')
            )}
        </div>
    );
};

export default PdfSave;
