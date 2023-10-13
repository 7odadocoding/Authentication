const notFound = (req, res, next) => {
   try {
      res.status(404).render('404.ejs');
   } catch (error) {
      throw error;
   }
};

module.exports = notFound;
