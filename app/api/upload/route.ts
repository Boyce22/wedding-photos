import { Storage } from 'megajs';
import { NextResponse, NextRequest } from 'next/server';

// Configurações do Storage
const STORAGE_EMAIL = process.env.EMAIL_CASAMENTO_NZ;
const STORAGE_PASSWORD = process.env.PASSWORD_MEGA_NZ;

/**
 * Inicializa o storage do Mega.
 * @returns {Promise<Storage>} Instância do storage.
 */
async function initializeStorage(): Promise<Storage> {
  try {
    if (!STORAGE_EMAIL || !STORAGE_PASSWORD) {
      throw new Error('Erro ao obter o login');
    }

    const storage = new Storage({ email: STORAGE_EMAIL, password: STORAGE_PASSWORD });
    await storage.ready;
    return storage;
  } catch (error) {
    console.error('Erro ao inicializar o storage:', error);
    throw new Error('Falha ao conectar ao serviço de armazenamento.');
  }
}

/**
 * Cria uma pasta no storage com base nos dados do usuário.
 * @param {Storage} storage - Instância do storage.
 * @param {string} userData - Dados do usuário em formato JSON string.
 * @returns {Promise<any>} Pasta criada.
 */
async function createFolder(storage: Storage, userData: string): Promise<any> {
  try {
    if (!userData) {
      throw new Error('Dados do usuário não encontrados.');
    }

    const { firstName, lastName, createdAt } = JSON.parse(userData);

    const folderName = `${firstName}-${lastName}-${createdAt}`;

    const folderNameNz = storage.root.children?.find((child) => child.name === folderName);

    if (!folderNameNz) {
      return await storage.mkdir(folderName);
    }

    return folderNameNz
    
  } catch (error) {
    console.error('Erro ao criar pasta:', error);
    throw new Error('Falha ao criar a pasta.');
  }
}

/**
 * Faz o upload de uma única foto para a pasta criada.
 * @param {Storage} storage - Instância do storage.
 * @param {string} photo - Foto em formato base64.
 * @param {string} userData - Dados do usuário em formato JSON string.
 * @returns {Promise<string>} Mensagem de sucesso.
 */
async function uploadSinglePhoto(storage: Storage, photo: string, userData: string): Promise<string> {
  try {
    const base64Data = photo.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    const folder = await createFolder(storage, userData);
    await folder.upload(`casamento-gean-miriam-${Date.now()}.jpg`, buffer).complete;

    return 'Foto salva com sucesso!';
  } catch (error) {
    console.error('Erro ao fazer upload de uma foto:', error);
    throw new Error('Falha ao salvar a foto.');
  }
}

/**
 * Faz o upload de múltiplas fotos para uma nova pasta.
 * @param {Storage} storage - Instância do storage.
 * @param {string[]} photos - Fotos em formato base64.
 * @param {string} userData - Dados do usuário em formato JSON string.
 * @returns {Promise<string>} Mensagem de sucesso.
 */
async function uploadMultiplePhotos(storage: Storage, photos: string[], userData: string): Promise<string> {
  try {
    const folder = await createFolder(storage, userData);

    const uploadPromises = photos.map((photo, index) => {
      const base64Data = photo.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      return folder.upload(`foto-${index + 1}.jpg`, buffer).complete;
    });

    await Promise.all(uploadPromises);
    return `Fotos salvas com sucesso!`;
  } catch (error) {
    console.error('Erro ao fazer upload de múltiplas fotos:', error);
    throw new Error('Falha ao salvar as fotos.');
  }
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Método não permitido' }, { status: 405 });
  }

  const { photos, isMultiple, userData } = await req.json();
  if (!photos || !Array.isArray(photos) || !userData) {
    return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
  }

  try {
    const storage = await initializeStorage();

    const message = isMultiple
      ? await uploadMultiplePhotos(storage, photos, userData)
      : await uploadSinglePhoto(storage, photos[0], userData);

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Erro no processamento da requisição:', error);
    return NextResponse.json(
      { message: 'Erro ao processar a requisição. Tente novamente.' },
      { status: 500 }
    );
  }
}