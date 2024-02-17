import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingSpinner = ({ duration = 5000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {isLoading && (
        <div className="spinner-container">
          <Loader
            type="TailSpin" // You can choose from various spinner types
            color="#00BFFF"
            height={50}
            width={50}
          />
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
