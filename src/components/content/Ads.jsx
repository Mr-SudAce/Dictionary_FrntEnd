import ads from "../../assets/gif.webp";

const Ads = () => {
    return (
        <div className="flex justify-center items-center max-w-full">
            <img
                src={ads}
                alt="Ad"
                className="h-52 w-full object-fit bg-white p-2"
            />
        </div>
    );
}

export default Ads;