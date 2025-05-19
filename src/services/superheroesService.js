import { Superhero } from '../models/Superhero.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
const ITEM_PER_PAGE = 5;

export async function getSuperheroes(page = 1) {
  const all = await Superhero.findAll();
  const paginated = all.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE);
  const pagesAmount = Math.ceil(all.length / ITEM_PER_PAGE);

  return { content: paginated, pagesAmount };
}

export async function getSuperheroById(id) {
  const hero = await Superhero.findByPk(id);
  return hero;
}

export async function createSuperhero(data, files) {
  const imagePaths = files?.map(file => '/uploads/' + file.filename) || [];

  const newHero = await Superhero.create({
    id: uuidv4(),
    ...data,
    images: imagePaths
  });

  return newHero;
}

export async function deleteSuperheroById(id) {
  const hero = await Superhero.findByPk(id);
  if (!hero) {
    return null;
  }

  const imagePaths = hero.images || [];

  for (const imgPath of imagePaths) {
    const filename = path.basename(imgPath);
    const fullPath = path.join(process.cwd(), 'uploads', filename);

    try {
      await fs.unlink(fullPath);
      console.log(`File deleted: ${fullPath}`);
    } catch (err) {
      console.warn(`Can't delete file ${fullPath}:`, err.message);
    }
  }

  await Superhero.destroy({ where: { id } });

  return true;
}

export async function updateSuperheroById(id, body, files) {
  const superhero = await Superhero.findByPk(id);
  if (!superhero) return null;

  const existingImages = body.existingImages
    ? JSON.parse(body.existingImages).filter(img => typeof img === 'string' && img.includes('/uploads/'))
    : [];

  const imagesToDelete = superhero.images.filter(img => !existingImages.includes(img));

  for (const imagePath of imagesToDelete) {
    const fullPath = path.join(process.cwd(), imagePath);
    try {
      await fs.unlink(fullPath);
      console.log('Deleted:', fullPath);
    } catch (err) {
      console.warn(`Can't delete file: ${fullPath}`, err.message);
    }
  }

  const newImages = files?.map(file => '/uploads/' + file.filename) || [];
  const updatedImages = Array.from(new Set([...existingImages, ...newImages]));

  const updatedData = {
    nickname: body.nickname ?? superhero.nickname,
    realName: body.realName ?? superhero.realName,
    originDescription: body.originDescription ?? superhero.originDescription,
    superpowers: body.superpowers ?? superhero.superpowers,
    catchPhrase: body.catchPhrase ?? superhero.catchPhrase,
    images: updatedImages
  };

  await superhero.update(updatedData);
  return superhero;
}
