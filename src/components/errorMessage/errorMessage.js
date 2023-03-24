const ErrorMessage = ({ error }) => {
  if (error) {
    console.log(error);
    return (
      <div className="single-book-page__error">
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default ErrorMessage;
