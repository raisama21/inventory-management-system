import "dotenv/config";
import {
    ref,
    getDownloadURL,
    FirebaseStorage,
    listAll,
    uploadBytes,
} from "firebase/storage";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/app/lib/definitions";

export async function convertImageToUint8Array(image: File) {
    const imageBuffer = await image.arrayBuffer();

    return new Uint8Array(imageBuffer);
}

export async function uploadImage(
    storage: FirebaseStorage,
    image: Uint8Array,
    path: string
) {
    const imageStorageReference = ref(storage, path);

    try {
        const response = await uploadBytes(imageStorageReference, image);

        return response;
    } catch (error) {
        console.log("error while uploading image: ", error);
    }
}

export async function getImageUrl(storage: FirebaseStorage, imagePath: string) {
    const response = await listAll(ref(storage, imagePath));

    return getDownloadURL(response.items[0]);
}

export function getSession() {
    const token = cookies().get("auth_session")?.value;

    if (!token) {
        return;
    }

    return jwt.verify(
        token,
        process.env.SECRET_KEY as jwt.Secret
    ) as JwtPayload;
}

export function parseDate(dateString: string) {
    const date = new Date(dateString);

    return date.toDateString();
}
