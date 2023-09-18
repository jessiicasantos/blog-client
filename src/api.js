export const getPosts =  async () => {
    try {
        let response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts/'
        );
        
        let data = await response.data;
        // console.log(response);
        return data;
    } catch (err) {
        console.error('Errrroooo!!! ', err);
    }
}

export const createPost =  async ( postData ) => {
    try {
        let response = await axios.post(
            'https://jsonplaceholder.typicode.com/posts/',
            {
                body: postData,
            }
        );
        
        let data = await response.data;
        // console.log(response);
        return data;
    } catch (err) {
        console.error('Errrroooo!!! ', err);
    }
}

export const getPost =  async ( id ) => {
    try {
        let response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        
        let data = await response.data;
        // console.log(response);
        return data;
    } catch (err) {
        console.error('Errrroooo!!! ', err);
    }
}