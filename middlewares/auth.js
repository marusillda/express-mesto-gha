const auth = (req, res, next) => {
  req.user = {
    _id: '646df21c1b61f7bc647ec642', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
};

module.exports = auth;
