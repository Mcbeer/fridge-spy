import { getRequestBody, respond } from '@fridgespy/express-helpers';
import { userLogger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/utils';
import { Request, Response } from 'express';
import { updateUser } from '../../database/user/updateUser';
import { removeFalseyKeysFromObject } from '../../utils/removeFalseyKeysFromObject';

interface PutUserBody {
  id: string;
  name?: string;
  email: string;
  password?: string;
  avatarUrl?: string;
}

interface PutUserUpdateObject {
  name?: string;
  email: string;
  password?: string;
  avatarUrl?: string;
}

export const putUser = async (req: Request, res: Response): Promise<void> => {
  const requestBody = getRequestBody<PutUserBody>(req);

  const updateObject = removeFalseyKeysFromObject<
    PutUserBody,
    PutUserUpdateObject
  >(requestBody);

  const [updateError, updatedUser] = await perhaps(
    updateUser(requestBody.id, updateObject)
  );

  if (updateError) {
    userLogger.error(updateError);
    respond(res).error(updateError);

    return;
  }

  if (!updatedUser) {
    const noUpdatedUser = new Error('No user updated, something went wrong');
    console.error(noUpdatedUser);
    respond(res).error(noUpdatedUser);

    return;
  }

  respond(res).success(updatedUser);
};
