import { getRequestParams, respond } from '@fridgespy/express-helpers';
import { logger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/perhaps';
import { Request, Response } from 'express';
import { removeUser } from '../../database/user/removeUser';

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = getRequestParams<{ id: string }>(req);

  const [deleteUserError, deletedUser] = await perhaps(removeUser({ _id: id }));

  if (deleteUserError) {
    logger.error(deleteUserError);
    respond(res).error(deleteUserError);

    return;
  }

  if (!deletedUser) {
    const noDeletedUser = new Error(
      'No user deleted in request, unknown error occured'
    );
    logger.error(noDeletedUser);
    respond(res).error(noDeletedUser);
    return;
  }

  respond(res).success(deletedUser);
};
