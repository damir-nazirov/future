import SingleBook from "../singleBook.js/SingleBook";
import { useSelector } from "react-redux";
import BackButton from "../backButton/BackButton";
import ErrorMessage from "../errorMessage/errorMessage";

const SingleBookPage = () => {
  const { error } = useSelector((state) => state.books);

  return (
    <>
      <ErrorMessage error={error} />
      <SingleBook />
      <BackButton />
    </>
  );
};

export default SingleBookPage;
