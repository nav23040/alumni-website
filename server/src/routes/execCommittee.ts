import express, { Request, Response } from 'express';
import verifyToken from '../auth/verifyToken';
import execCommittee, {
    IExecCommittee,
    IImage,
} from '../models/execCommittee.model';
import User from '../models/user.model';
import { fileToBase } from './upload';

const app = express.Router();

app.get('/members', async (_req: Request, res: Response) => {
    try {
        const allCommittee = await execCommittee.find();
        if (!allCommittee) {
            throw new Error('No members in Executive Committee.');
        }
        const members: { [id: string]: Array<IExecCommittee> } = {};
        const keys = new Set<string>();
        allCommittee.forEach((element) => {
            keys.add(element.category as string);
        });
        keys.forEach((key) => {
            members[key] = allCommittee.filter(
                (member) => member.category === key
            );
        });
        // console.log(members);
        res.send({ members });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

app.post('/members', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            primary_email: res.locals.payload.email,
        });
        if (!user || !user?.isAdmin) {
            throw new Error('Error identifying admin!');
        }
        await updateExecCommitteeMember(req.body);
        res.send({
            error: false,
            message: 'Successfuly updated executive committee.',
        });
    } catch (err) {
        res.send({ error: true, message: err.message });
    }
});

async function updateExecCommitteeMember(memberInfo: any) {
    const execMember: IExecCommittee = new execCommittee({
        first_name: memberInfo.first_name,
        last_name: memberInfo.last_name,
        info: memberInfo.info,
        category: memberInfo.category,
        position: memberInfo.position,
        email: memberInfo.email,
        website: memberInfo?.website ?? null,
        linkedIn: memberInfo?.linkedIn ?? null,
        facebook: memberInfo?.facebook ?? null,
    } as IExecCommittee);
    if (!memberInfo.image) {
        const details: any = await fileToBase('../assets/profile.png');
        execMember.image = {
            name: details.name,
            size: details.size as Number,
            data: details.data,
            file_type: details.file_type,
        } as IImage;
    } else {
        execMember.image = {
            name: memberInfo.image.name,
            size: memberInfo.image.size as Number,
            data: memberInfo.image.data,
            file_type: memberInfo.image.file_type,
        } as IImage;
    }
    return await execMember.save();
}

export default app;
