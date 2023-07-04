import axios from 'axios';

export async function searchImage(imageName, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=31885049-d6faf86aacab52c89b6b918a3&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
