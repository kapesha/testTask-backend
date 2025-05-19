import { getSuperheroes, deleteSuperheroById, createSuperhero, getSuperheroById, updateSuperheroById } from '../services/superheroesService.js';

export async function getAllSuperheroes(req, res) {
  const page = parseInt(req.query.page) || 1;

  try {
    const result = await getSuperheroes(page);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getOneSuperhero(req, res) {
  const { id } = req.params;

  try {
    const hero = await getSuperheroById(id);
    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }
    res.send(hero);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createOneSuperhero(req, res) {
  try {
    const hero = await createSuperhero(req.body, req.files);
    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteOneSuperhero(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteSuperheroById(id);

    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json({ message: 'Superhero deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateOneSuperhero(req, res) {
  try {
    const updatedHero = await updateSuperheroById(req.params.id, req.body, req.files);
    if (!updatedHero) {
      return res.status(404).json({ error: 'This item does not exist' });
    }

    res.status(200).json(updatedHero);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
}
