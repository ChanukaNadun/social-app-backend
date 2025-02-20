import mongoose, { Schema, Document } from "mongoose";

interface IItem extends Document {
  name: string;
  price: number;
}

interface ICard extends Document {
  title: string;
  description: string;
  items: IItem[];
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const CardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: [ItemSchema], // Array of items inside the card
});

export const Card = mongoose.model<ICard>("Card", CardSchema);
export const Item = mongoose.model<IItem>("Item", ItemSchema);
