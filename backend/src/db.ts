import mongoose from "mongoose"
import "dotenv/config"


mongoose.connect(process.env.DB_URL || " ");

const schema = mongoose.Schema;
type objID = mongoose.Schema.Types.ObjectId;

const userSchema = new schema({
    username: {type: String,unique:true,required: true,trim:true,lowercase:true},
    password: {type:String,required: true}
});

export const User = mongoose.model("User",userSchema)

const tagsSchema = new schema({
    title: {type: String, unique: true, required: true, trim: true }
});

export const Tags = mongoose.model("Tags",tagsSchema);

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new schema({
    link : {type: String,trim: true},
    type: {type: String,enum: contentTypes,trim: true},
    title: {type:String,trim: true},
    tags: [{type: mongoose.Schema.Types.ObjectId,ref: 'Tags'}],
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true}
});

export const Content  = mongoose.model("Content",contentSchema);

const linkSchema = new schema({
    hash: {type: String,required: true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User'}
})

export const Link = mongoose.model("Link",linkSchema);