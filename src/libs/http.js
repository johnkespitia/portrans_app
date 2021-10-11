class Http {
  static instance = new Http();

  get = async url => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (error) {
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      let json = await req.json();
      return json;
    } catch (error) {
      return null;
    }
  };

  sendForm = async (url, body) => {
    try {
      const data = new FormData();
      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });
      let req = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });
      let json = await req.json();
      return json;
    } catch (error) {
      return null;
    }
  };
}

export default Http;
