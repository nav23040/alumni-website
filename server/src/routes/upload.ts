import multer from 'multer';

export const storage = multer.diskStorage({
    destination: (_req: any, _file: any, cb: any) => cb(null, 'src/uploads/'),
    filename: (_req: any, file: any, cb: any) =>
        cb(
            null,
            Date.now() +
                '.' +
                file.originalname.split('.')[
                    file.originalname.split('.').length - 1
                ]
        ),
});

export const fileToBase = (file: any) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            console.log(file);
            resolve({
                name: file.name,
                file_type: file.type,
                data: reader.result,
                size: file.size,
            });
        };
        reader.readAsDataURL(file);
    });
};

export const upload = multer({ storage: storage });
