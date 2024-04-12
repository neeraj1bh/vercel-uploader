const extractFileNameFromUrl = (url: string): string => {
  return url.split(".com/")[1];
};

export default extractFileNameFromUrl;
