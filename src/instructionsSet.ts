import { alias } from './instructionAlias';
import * as instructions from './instructions';
import { Cpu } from "./cpu";

export const instructionsSet = function(cpu: Cpu, instruction: number) {
    switch(instruction) {
        case alias.NOP: break;
        case alias.LD_BC_D16: instructions.ld_r16_nn(cpu, 'bc'); break;
        case alias.LD_DE_D16: instructions.ld_r16_nn(cpu, 'de'); break;
        case alias.LD_HL_D16: instructions.ld_r16_nn(cpu, 'hl'); break;
        case alias.LD_SP_D16: instructions.ld_r16_nn(cpu, 'sp'); break;
        case alias.LD_REF_BC_A: instructions.ld_ref_r16_r8(cpu, 'bc' ,'a'); break;
        case alias.LD_REF_DE_A: instructions.ld_ref_r16_r8(cpu, 'de' ,'a'); break;
        case alias.LD_REF_HL_B: instructions.ld_ref_r16_r8(cpu, 'hl' ,'b'); break;
        case alias.LD_REF_HL_C: instructions.ld_ref_r16_r8(cpu, 'hl' ,'c'); break;
        case alias.LD_REF_HL_D: instructions.ld_ref_r16_r8(cpu, 'hl' ,'d'); break;
        case alias.LD_REF_HL_E: instructions.ld_ref_r16_r8(cpu, 'hl' ,'e'); break;
        case alias.LD_REF_HL_H: instructions.ld_ref_r16_r8(cpu, 'hl' ,'h'); break;
        case alias.LD_REF_HL_L: instructions.ld_ref_r16_r8(cpu, 'hl' ,'l'); break;
        case alias.LD_REF_HL_A: instructions.ld_ref_r16_r8(cpu, 'hl' ,'a'); break;
        case alias.INC_BC: instructions.inc_r16(cpu, 'bc'); break;
        case alias.INC_DE: instructions.inc_r16(cpu, 'de'); break;
        case alias.INC_HL: instructions.inc_r16(cpu, 'hl'); break;
        case alias.INC_SP: instructions.inc_r16(cpu, 'sp'); break;
        case alias.INC_B: instructions.inc_r8(cpu, 'b'); break;
        case alias.INC_C: instructions.inc_r8(cpu, 'c'); break;
        case alias.INC_D: instructions.inc_r8(cpu, 'd'); break;
        case alias.INC_E: instructions.inc_r8(cpu, 'e'); break;
        case alias.INC_A: instructions.inc_r8(cpu, 'a'); break;
        case alias.INC_H: instructions.inc_r8(cpu, 'h'); break;
        case alias.INC_L: instructions.inc_r8(cpu, 'l'); break;
        case alias.DEC_B: instructions.dec_r8(cpu, 'b'); break;
        case alias.DEC_C: instructions.dec_r8(cpu, 'c'); break;
        case alias.DEC_D: instructions.dec_r8(cpu, 'd'); break;
        case alias.DEC_E: instructions.dec_r8(cpu, 'e'); break;
        case alias.DEC_A: instructions.dec_r8(cpu, 'a'); break;
        case alias.DEC_H: instructions.dec_r8(cpu, 'h'); break;
        case alias.DEC_L: instructions.dec_r8(cpu, 'l'); break;
        case alias.DEC_BC: instructions.dec_r16(cpu, 'bc'); break;
        case alias.DEC_DE: instructions.dec_r16(cpu, 'de'); break;
        case alias.DEC_HL: instructions.dec_r16(cpu, 'hl'); break;
        case alias.DEC_SP: instructions.dec_r16(cpu, 'sp'); break;
        case alias.LD_A_D8: instructions.ld_r8_n(cpu, 'b'); break;
        case alias.LD_B_D8: instructions.ld_r8_n(cpu, 'b'); break;
        case alias.LD_C_D8: instructions.ld_r8_n(cpu, 'c'); break;
        case alias.LD_D_D8: instructions.ld_r8_n(cpu, 'd'); break;
        case alias.LD_E_D8: instructions.ld_r8_n(cpu, 'e'); break;
        case alias.LD_H_D8: instructions.ld_r8_n(cpu, 'h'); break;
        case alias.LD_L_D8: instructions.ld_r8_n(cpu, 'l'); break;
        case alias.LD_A_B: instructions.ld_r8_r8(cpu, 'a', 'b'); break;
        case alias.LD_A_C: instructions.ld_r8_r8(cpu, 'a', 'c'); break;
        case alias.LD_A_D: instructions.ld_r8_r8(cpu, 'a', 'd'); break;
        case alias.LD_A_E: instructions.ld_r8_r8(cpu, 'a', 'e'); break;
        case alias.LD_A_A: instructions.ld_r8_r8(cpu, 'a', 'a'); break;
        case alias.LD_A_H: instructions.ld_r8_r8(cpu, 'a', 'h'); break;
        case alias.LD_A_L: instructions.ld_r8_r8(cpu, 'a', 'l'); break;
        case alias.LD_B_B: instructions.ld_r8_r8(cpu, 'b', 'b'); break;
        case alias.LD_B_C: instructions.ld_r8_r8(cpu, 'b', 'c'); break;
        case alias.LD_B_D: instructions.ld_r8_r8(cpu, 'b', 'd'); break;
        case alias.LD_B_E: instructions.ld_r8_r8(cpu, 'b', 'e'); break;
        case alias.LD_B_A: instructions.ld_r8_r8(cpu, 'b', 'a'); break;
        case alias.LD_B_H: instructions.ld_r8_r8(cpu, 'b', 'h'); break;
        case alias.LD_B_L: instructions.ld_r8_r8(cpu, 'b', 'l'); break;
        case alias.LD_C_B: instructions.ld_r8_r8(cpu, 'c', 'b'); break;
        case alias.LD_C_C: instructions.ld_r8_r8(cpu, 'c', 'c'); break;
        case alias.LD_C_D: instructions.ld_r8_r8(cpu, 'c', 'd'); break;
        case alias.LD_C_E: instructions.ld_r8_r8(cpu, 'c', 'e'); break;
        case alias.LD_C_A: instructions.ld_r8_r8(cpu, 'c', 'a'); break;
        case alias.LD_C_H: instructions.ld_r8_r8(cpu, 'c', 'h'); break;
        case alias.LD_C_L: instructions.ld_r8_r8(cpu, 'c', 'l'); break;
        case alias.LD_D_B: instructions.ld_r8_r8(cpu, 'd', 'b'); break;
        case alias.LD_D_C: instructions.ld_r8_r8(cpu, 'd', 'c'); break;
        case alias.LD_D_D: instructions.ld_r8_r8(cpu, 'd', 'd'); break;
        case alias.LD_D_E: instructions.ld_r8_r8(cpu, 'd', 'e'); break;
        case alias.LD_D_A: instructions.ld_r8_r8(cpu, 'd', 'a'); break;
        case alias.LD_D_H: instructions.ld_r8_r8(cpu, 'd', 'h'); break;
        case alias.LD_D_L: instructions.ld_r8_r8(cpu, 'd', 'l'); break;
        case alias.LD_E_B: instructions.ld_r8_r8(cpu, 'e', 'b'); break;
        case alias.LD_E_C: instructions.ld_r8_r8(cpu, 'e', 'c'); break;
        case alias.LD_E_D: instructions.ld_r8_r8(cpu, 'e', 'd'); break;
        case alias.LD_E_E: instructions.ld_r8_r8(cpu, 'e', 'e'); break;
        case alias.LD_E_A: instructions.ld_r8_r8(cpu, 'e', 'a'); break;
        case alias.LD_E_H: instructions.ld_r8_r8(cpu, 'e', 'h'); break;
        case alias.LD_E_L: instructions.ld_r8_r8(cpu, 'e', 'l'); break;
        case alias.LD_H_B: instructions.ld_r8_r8(cpu, 'h', 'b'); break;
        case alias.LD_H_C: instructions.ld_r8_r8(cpu, 'h', 'c'); break;
        case alias.LD_H_D: instructions.ld_r8_r8(cpu, 'h', 'd'); break;
        case alias.LD_H_E: instructions.ld_r8_r8(cpu, 'h', 'e'); break;
        case alias.LD_H_A: instructions.ld_r8_r8(cpu, 'h', 'a'); break;
        case alias.LD_H_H: instructions.ld_r8_r8(cpu, 'h', 'h'); break;
        case alias.LD_H_L: instructions.ld_r8_r8(cpu, 'h', 'l'); break;
        case alias.LD_L_B: instructions.ld_r8_r8(cpu, 'l', 'b'); break;
        case alias.LD_L_C: instructions.ld_r8_r8(cpu, 'l', 'c'); break;
        case alias.LD_L_D: instructions.ld_r8_r8(cpu, 'l', 'd'); break;
        case alias.LD_L_E: instructions.ld_r8_r8(cpu, 'l', 'e'); break;
        case alias.LD_L_A: instructions.ld_r8_r8(cpu, 'l', 'a'); break;
        case alias.LD_L_H: instructions.ld_r8_r8(cpu, 'l', 'h'); break;
        case alias.LD_L_L: instructions.ld_r8_r8(cpu, 'l', 'l'); break;
        case alias.RLCA: instructions.rlca(cpu); break;
        case alias.RRCA: instructions.rrca(cpu); break;
        case alias.LD_REF_A16_SP: instructions.ld_ref_nn_r16(cpu, 'sp'); break;
        case alias.ADD_HL_BC: instructions.add_r16_r16(cpu, 'hl', 'bc'); break;
        case alias.ADD_HL_DE: instructions.add_r16_r16(cpu, 'hl', 'de'); break;
        case alias.ADD_HL_HL: instructions.add_r16_r16(cpu, 'hl', 'de'); break;
        case alias.ADD_HL_SP: instructions.add_r16_r16(cpu, 'hl', 'de'); break;
        case alias.ADD_A_A: instructions.add_r8_r8(cpu, 'a', 'a'); break;
        case alias.ADD_A_B: instructions.add_r8_r8(cpu, 'a', 'b'); break;
        case alias.ADD_A_C: instructions.add_r8_r8(cpu, 'a', 'c'); break;
        case alias.ADD_A_D: instructions.add_r8_r8(cpu, 'a', 'd'); break;
        case alias.ADD_A_E: instructions.add_r8_r8(cpu, 'a', 'e'); break;
        case alias.ADD_A_H: instructions.add_r8_r8(cpu, 'a', 'h'); break;
        case alias.ADD_A_L: instructions.add_r8_r8(cpu, 'a', 'l'); break;
        case alias.LD_A_REF_BC: instructions.ld_r8_ref_r16(cpu, 'a', 'bc'); break;
        case alias.LD_A_REF_DE: instructions.ld_r8_ref_r16(cpu, 'a', 'bc'); break;
        case alias.STOP_0: console.log("STOP"); throw Error("STOPPING"); break;
        case alias.RRA: instructions.rra(cpu); break;
        case alias.RLA: instructions.rla(cpu); break;
        case alias.JR_R8: instructions.jr_r8(cpu); break;
        case alias.JR_NZ_R8: instructions.jr_nz_r8(cpu); break;
        case alias.DAA: instructions.daa(cpu); break;
        case alias.JR_Z_R8: instructions.jr_z_r8(cpu); break;
        case alias.LD_REF_HL_PLUS_A: instructions.ld_ref_hl_plus_a(cpu); break; // TODO
    }
}
