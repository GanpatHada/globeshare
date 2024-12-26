export function isProfilePhotoChnaged(originalProfilePhoto,changedProfilePhoto)
{
    return JSON.stringify(originalProfilePhoto)!==JSON.stringify(changedProfilePhoto)
}