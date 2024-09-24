
import FileSaver from 'file-saver'

export default async function downloadImage(_id,photo){
  FileSaver.saveAs(photo,`download-${_id}.jpg`);
}
