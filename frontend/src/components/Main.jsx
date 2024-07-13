import React from "react";
import quiz from "../assets/quiz.png";
import note from "../assets/note.png";
import chatbot from "../assets/chatbot2.png";
const Main = () => {
    return (
        <div className="fixed top-[68px] left-[350px] ml-8 ">
            <div className="h-[90vh] overflow-scroll w-4/5">
                <div className="container mx-auto p-6">
                    <h1 className="text-4xl font-bold mb-4 text-center">
                        Understanding Polymorphism in Java
                    </h1>

                    <p className="mb-4">
                        Polymorphism is one of the core concepts of
                        Object-Oriented Programming (OOP) in Java. It allows
                        objects of different classes to be treated as objects of
                        a common superclass. Polymorphism facilitates
                        flexibility and the integration of different aspects of
                        your code more seamlessly.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">
                        Types of Polymorphism
                    </h2>
                    <ul className="list-disc ml-5 mb-4">
                        <li>
                            <strong>
                                Compile-time Polymorphism (Method Overloading):
                            </strong>{" "}
                            This occurs when you have multiple methods in the
                            same class with the same name but different
                            parameters.
                        </li>
                        <li>
                            <strong>
                                Runtime Polymorphism (Method Overriding):
                            </strong>{" "}
                            Occurs when a subclass provides a specific
                            implementation of a method that is already defined
                            in its superclass.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-2">
                        Method Overloading
                    </h2>
                    <p className="mb-4">
                        Method Overloading in Java occurs when two or more
                        methods share the same name but have different
                        parameters. It is a compile-time polymorphism.
                    </p>

                    <pre className="bg-gray-100 p-4 rounded mb-4">
                        {`
public class OverloadExample {
    // Method with 2 parameters
    public void display(int a, int b) {
        System.out.println("Method with 2 parameters");
    }
    // Method with 3 parameters
    public void display(int a, int b, int c){
        System.out.println("Method with 3 parameters");
            }
    }

class Main &#123
    public static void main(String[] args) {
        OverloadExample obj = new OverloadExample();
        obj.display(1, 2);
        obj.display(1, 2, 3);
           }
    }
        `}
                    </pre>

                    <h2 className="text-2xl font-semibold mb-2">
                        Method Overriding
                    </h2>
                    <p className="mb-4">
                        Method Overriding in Java occurs when a subclass
                        provides a specific implementation of a method that is
                        already defined in its superclass. It is a runtime
                        polymorphism.
                    </p>

                    <pre className="bg-gray-100 p-4 rounded mb-4">
                        {`
class Animal {
    public void sound() {
        System.out.println("Animal makes a sound");
    &#125
&#125

class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks");
           }
    }

class Main {
    public static void main(String[] args) {
        Animal obj = new Dog();
        obj.sound();  // Dog barks
           }
    }
        `}
                    </pre>

                    <h2 className="text-2xl font-semibold mb-2">
                        Benefits of Polymorphism
                    </h2>
                    <ul className="list-disc ml-5 mb-4">
                        <li>Increases the flexibility of code.</li>
                        <li>Enhances code maintainability.</li>
                        <li>
                            Supports the implementation of elegant design
                            patterns.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-2">
                        Further Learning
                    </h2>
                    <p className="mb-4">
                        To learn more about Polymorphism in Java, check out this{" "}
                        <a
                            className="text-blue-600 underline"
                            href="https://www.youtube.com/watch?v=4z9I78BpI4Y"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            YouTube tutorial
                        </a>
                        .
                    </p>
                </div>
            </div>
            <div className="fixed right-16 top-[200px]">
                <img
                    className="w-16 h-16 m-14 cursor-pointer  hover:w-20 hover:h-20"
                    src={quiz}
                />
                <img
                    className="w-16 h-16 m-14 cursor-pointer  hover:w-20 hover:h-20"
                    src={note}
                />
                <img
                    className="w-16 h-16 m-14 cursor-pointer  hover:w-20 hover:h-20"
                    src={chatbot}
                />
            </div>
        </div>
    );
};

export default Main;
