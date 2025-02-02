import {
  resSpeechServices,
  testo,
  listVoicesServices,
  listVoicesServicesHelper,
} from "../services/voices";
import { Request, Response } from "express";

const root = (req: Request, res: Response) => {
  res.json({ message: "Helour desde cotnrl" });
};

const voiceList = async (req: Request, res: Response) => {
  const { language, mode } = req.query;
  const response = await listVoicesServices(`${language}`, `${mode}`);
  // console.log(response)
  res.json(response);

  // res.json({message: 'me llego'})
};

const postVoices = async ({ body }: Request, res: Response) => {
  const response: any = await resSpeechServices(body);

  // console.log(response);

  setTimeout(async () => {
    // console.log(response);
    if (response?.path === null) {
      const error = new Error("No se pudo generar el audio");
      return res.status(400).json({ message: error.message });
    }

    res.json(response);
  }, 15000);
};

const test = async (req: Request, res: Response) => {
  const response = await testo();
  setTimeout(() => {
    res.json(response);
  }, 30000);
};

const getVoices = async (req: Request, res: Response) => {
  const { language, mode } = req.query;
  const response = await listVoicesServicesHelper(`${language}`, `${mode}`);
  res.json(response);
}

export { root, postVoices, test, voiceList,getVoices };
