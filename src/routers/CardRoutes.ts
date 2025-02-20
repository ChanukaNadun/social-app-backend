import express, { Request, Response, RequestHandler } from "express";
import { Card, Item } from "../model/CardModel";

const router = express.Router();

// Create a new card
router.post("/cards", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newCard = new Card({ title, description, items: [] });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get all cards
router.get("/cards", async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get a single card by ID
router.get("/cards/:id", (async (req: Request, res: Response) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Update a card's title or description
router.put("/cards/:id", (async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedCard)
      return res.status(404).json({ message: "Card not found" });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Delete a card
router.delete("/cards/:id", (async (req: Request, res: Response) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard)
      return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Add an item to a card
router.post("/cards/:id/items", (async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    const newItem = new Item ({ name, price });
    card.items.push(newItem);
    await card.save();

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

export default router;
