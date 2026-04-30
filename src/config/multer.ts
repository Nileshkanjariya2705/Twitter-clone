import multer from "multer"

const storage=multer.diskStorage({
    destination:function(req,file,done){
        done(null,'./public/upload')
    },
    filename:function(req,file,done){
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          done(null, uniqueSuffix + '-' + file.originalname);
    }
})

const upload=multer({storage:storage})


export default upload;