import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/Backbutton';
import { useSnackbar } from 'notistack';

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://book-tracker-krc4.onrender.com/books/${id}`).then((res) => {
      setBook(res.data);
      enqueueSnackbar("Book Displayed Successfully", { variant: 'success' });
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      enqueueSnackbar("Error Occured", { variant: 'error' });
      setLoading(false);
    });
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className='text-xl mr-4 text-gray-400'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-gray-400'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-gray-400'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-gray-400'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-gray-400'>Summary</span>
            <span>{book.summary}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-gray-400'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-gray-400'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default ShowBook;