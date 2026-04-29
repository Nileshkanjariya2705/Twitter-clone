import multer from "multer"

const storage=multer.diskStorage({
    destination:function(req,file,done){
        done(null,'./public/upload')
    },
    filename:function(req,file,done){
        done(null,file.originalname)
    }
})

const upload=multer({storage:storage})


export default upload;