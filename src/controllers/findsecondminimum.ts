import express, { Request, Response, Router } from 'express';
import db from '../models/db';
import { genId } from '../utils/utils';
import { INumber } from '../types';

export default function getController(): Router {
  return express
    .Router({ mergeParams: true })
    .get('/list', showSecondMinimum)
    .post('/calculate', findSecondMinimum);
}
export function findSecondMinimumFromInput(input: Array<number>): number | String {
  let min = Infinity,
    secondMin = Infinity;
  if (input.length < 2) {
    return 'Invalid Input';
  }
  for (const number of input) {
    if (number < min) {
      secondMin = min;
      min = number;
    } else if (number < secondMin && number !== min) {
      secondMin = number;
    }
  }
  return secondMin;
}

async function showSecondMinimum(req: Request, res: Response) {
  const userData = await db.data.list();
  res.json({ userData });
}

async function findSecondMinimum(req: Request, res: Response) {
  const { input } = req.body;
  if (input) {
    const inputExists = await db.data.findByInput(input);
    if (!inputExists) {
      const output = findSecondMinimumFromInput(input);
      if (typeof output === 'number') {
        const userData: INumber = {
          id: genId(6),
          input,
          output,
        };
        await db.data.save(userData);
        res.status(200).json({ success: true, input, output });
      } else {
        res.status(200).json({ success: false, input, output });
      }
    } else {
      res.status(200).json({ success: true, ...inputExists });
    }
  } else {
    res.status(200).json({ success: false, message: 'Please Provide Input Details' });
  }
}
