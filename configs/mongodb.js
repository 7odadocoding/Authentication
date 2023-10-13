const mongoose = require('mongoose');

class MongoDb {
   instance = null;
   db = null;
   constructor(uri) {
      this.uri = uri;
   }
   static async getDb() {
      try {
         if (!this.uri)
            throw new Error('please set database uri first with .setUri(uri)');
         if (this.db != null) return db;
         if (this.instance != null) return await this.instance.connect();
         this.instance = new this();
         return await this.getDb();
      } catch (error) {
         throw error;
      }
   }
   static setUri(uri) {
      this.uri = uri;
      this.instance = new this(uri);
      return this;
   }
   async connect() {
      return await mongoose.connect(this.uri);
   }
}

module.exports = MongoDb;
