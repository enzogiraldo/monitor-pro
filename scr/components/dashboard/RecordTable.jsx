import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from '../ThemeProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit2, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusConfig = {
  pendente: { label: 'Pendente', color: 'bg-amber-500/20 text-amber-500 border-amber-500/30', icon: Clock },
  em_progresso: { label: 'Em Progresso', color: 'bg-blue-500/20 text-blue-500 border-blue-500/30', icon: AlertCircle },
  concluído: { label: 'Concluído', color: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30', icon: CheckCircle2 },
  cancelado: { label: 'Cancelado', color: 'bg-slate-500/20 text-slate-500 border-slate-500/30', icon: AlertCircle },
};

const categoryConfig = {
  trabalho: 'bg-blue-600',
  pessoal: 'bg-violet-600',
  saúde: 'bg-emerald-600',
  estudos: 'bg-amber-600',
  finanças: 'bg-cyan-600',
  outro: 'bg-slate-600',
};

const priorityConfig = {
  baixa: 'text-slate-400',
  média: 'text-amber-500',
  alta: 'text-red-500',
};

export default function RecordTable({ records, onEdit, onDelete, onStatusChange }) {
  const { theme } = useTheme();

  if (!records?.length) {
    return (
      <div className={`text-center py-16 rounded-2xl ${
        theme === 'dark' ? 'bg-slate-800/30' : 'bg-slate-50'
      }`}>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
          Nenhum registro encontrado
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden ${
      theme === 'dark' 
        ? 'bg-slate-800/50 border border-slate-700/50' 
        : 'bg-white border border-slate-200 shadow-lg shadow-slate-200/50'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}>
              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Atividade
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Categoria
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Status
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Prioridade
              </th>
              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Data
              </th>
              <th className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            <AnimatePresence>
              {records.map((record, index) => {
                const StatusIcon = statusConfig[record.status]?.icon || Clock;
                return (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-slate-700/30' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${categoryConfig[record.category]}`} />
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {record.title}
                          </p>
                          {record.notes && (
                            <p className={`text-sm truncate max-w-xs ${
                              theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              {record.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`${
                        theme === 'dark' ? 'border-slate-600' : 'border-slate-300'
                      } capitalize`}>
                        {record.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onStatusChange(record)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 ${
                          statusConfig[record.status]?.color
                        }`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig[record.status]?.label}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium capitalize ${priorityConfig[record.priority]}`}>
                        {record.priority}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {format(new Date(record.date), "dd MMM yyyy", { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                              theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                            }`}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className={
                          theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''
                        }>
                          <DropdownMenuItem onClick={() => onEdit(record)}>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDelete(record)}
                            className="text-red-500 focus:text-red-500"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}