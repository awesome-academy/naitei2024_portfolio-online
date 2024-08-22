export enum FOLLOW {
  CANNOTFOLLOW = 'Users cannot follow themselves',
  ALREADYFOLLOW = 'Already following this user',
  SUCCESSFULLYFOLLOW = 'Successfully followed the user',
  NOTFOLLOW = 'Not following this user',
  SUCCESSFULLYUNFOLLOW = 'Successfully unfollowed the user',
  ALREADYREQUESTED = 'Already requested to follow this user',
  REQUESTSENT = 'Request sent successfully',
  NOREQUEST = 'No request found',
  ACCEPTEDSUCCESS = 'Request accepted successfully',
  REJECTEDSUCCESS = 'Request rejected successfully'
}
export enum STATUSFOLLOW {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  FOLLOWING = 'FOLLOWING',
  NOT_FOLLOWING = 'NOT_FOLLOWING'
}
