import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Save } from 'lucide-react';
import { format } from 'date-fns';

const categories = [
  { value: 'trabalho', label: 'Trabalho' },
  { value: 'pessoal', label: 'Pessoal' },
  { value: 'saúde', label: 'Saúde' },
  { value: 'estudos', label: 'Estudos' },
  { value: 'finanças', label: 'Finanças' },
  { value: 'outro', label: 'Outro' },
];

const priorities = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'média', label: 'Média' },
  { value: 'alta', label: 'Alta' },
];

const statuses = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'em_progresso', label: 'Em Progresso' },
  { value: 'concluído', label: 'Concluído' },
  { value: 'cancelado', label: 'Cancelado' },
];

export default function RecordForm({ record, onSubmit, onCancel }) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    category: 'trabalho',
    status: 'pendente',
    priority: 'média',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: '',
    value: '',
  });

  useEffect(() => {
    if (record) {
      setFormData({
        title: record.title || '',
        category: record.category || 'trabalho',
        status: record.status || 'pendente',
        priority: record.priority || 'média',
        date: record.date || format(new Date(), 'yyyy-MM-dd'),
        notes: record.notes || '',
        value: record.value || '',
      });
    }
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      value: formData.value ? Number(formData.value) : null,
    });
  };

  const inputClass = theme === 'dark' 
    ? 'bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500' 
    : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-2xl p-6 mb-6 ${
        theme === 'dark' 
          ? 'bg-slate-800/50 border border-slate-700/50' 
          : 'bg-white border border-slate-200 shadow-lg shadow-slate-200/50'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {record ? 'Editar Registro' : 'Novo Registro'}
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              Título da Atividade
            </Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Reunião de planejamento"
              className={`mt-2 ${inputClass}`}
              required
            />
          </div>

          <div>
            <Label className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              Categoria
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className={`mt-2 ${inputClass}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              Data
            </Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`mt-2 ${inputClass}`}
              required
            />
          </div>

          <div>
            <Label className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              Prioridade
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger className={`mt-2 ${inputClass}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                {priorities.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className={`mt-2 ${inputClass}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                {statuses.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              Valor (opcional)
            </Label>
            <Input
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="Ex: horas, quantidade"
              className={`mt-2 ${inputClass}`}
            />
          </div>

          <div className="md:col-span-2">
            <Label className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              Observações
            </Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Adicione notas ou detalhes..."
              className={`mt-2 min-h-[100px] ${inputClass}`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className={
            theme === 'dark' ? 'border-slate-600 hover:bg-slate-700' : ''
          }>
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            {record ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}