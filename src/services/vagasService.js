import { supabase } from '../lib/supabase'

export async function buscarVagas() {
  return await supabase
    .from('vagas')
    .select('*')
    .order('created_at', { ascending: false })
}

export async function criarVaga(vaga) {
  return await supabase
    .from('vagas')
    .insert(vaga)
    .select()
    .single()
}

export async function atualizarVaga(id, vaga) {
  return await supabase
    .from('vagas')
    .update(vaga)
    .eq('id', id)
    .select()
    .single()
}

export async function excluirVaga(id) {
  return await supabase
    .from('vagas')
    .delete()
    .eq('id', id)
}