import jsPDF from "jspdf";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Plus } from "lucide-react";

 function  ToPdf(){
    const [image, setImage] = useState(null)

    const onDrop = (files) => {
        setImage(files[0])
    }

    const convertToPDF = () =>{
        if (!image) return

        const reader = new FileReader()

        reader.onload = () => {
            const pdf = new jsPDF();
            const imgData = reader.result;

            pdf.addImage(imgData, "JPEG", 10, 10, 180, 0)
            pdf.save("converted.pdf");
        }

        reader.readAsDataURL(image)
    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: {"image/*": []},
        onDrop,
    })

    return(
        <div className="flex flex-col lg:mx-20 mx-10 bg-green min-h-screen justify-center">
            <div {...getRootProps()} className="flex flex-col  border-2 lg:p-20 p-10 text-center cursor-pointer">
                <div className="inline-block justify-items-center ">
                    <Plus className="m-10" size={24}/>
                </div>
                <input {...getInputProps()} />
                <p>drag & drop your image here</p>
            </div>

            {image && (
                <div className="flex flex-col w-fit">
                    <p>{image.name}</p>
                    <button onClick={convertToPDF} className="inline-block text-white font-bold w-25 py-6 bg-pink-700 rounded-xl">
                        convert to pdf
                    </button>
                </div>
            )}
        </div>
    )
}

export default ToPdf
