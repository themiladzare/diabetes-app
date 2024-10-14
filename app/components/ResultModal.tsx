// components/ResultModal.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface ResultModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ open, message, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>نتیجه</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose} color="primary">
          ادامه
        </Button> */}
        <button
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center  dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          بعدی
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultModal;
