import SingleBook from "../singleBook.js/SingleBook";
import { useSelector } from "react-redux";
import ErrorMessage from "../errorMessage/errorMessage";

const SingleBookPage = () => {
  const { error } = useSelector((state) => state.books);

  return (
    <>
      <ErrorMessage error={error} />
      <SingleBook />
    </>
  );
};

export default SingleBookPage;
