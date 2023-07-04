import axios from 'axios';

export const searchImage = async (imageName, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: imageName,
        page: page,
        key: '31885049-d6faf86aacab52c89b6b918a3',
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// {?q=${imageName}&page=${page}&key=31885049-d6faf86aacab52c89b6b918a3&image_type=photo&orientation=horizontal&per_page=12`
