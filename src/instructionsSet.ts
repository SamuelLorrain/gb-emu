import { alias } from './instructionAlias';
import * as instructions from './instructions';
import { Cpu } from "./cpu";

export const instructionsSet = function(cpu: Cpu, instruction: number) {
    switch(instruction) {

        // 0x0z
        case alias.NOP: break;
        case alias.LD_BC_D16: instructions.ld_r16_nn(cpu, 'bc'); break;
        case alias.LD_REF_BC_A: instructions.ld_ref_r16_r8(cpu, 'bc' ,'a'); break;
        case alias.INC_BC: instructions.inc_r16(cpu, 'bc'); break;
        case alias.INC_B: instructions.inc_r8(cpu, 'b'); break;
        case alias.DEC_B: instructions.dec_r8(cpu, 'b'); break;
        case alias.LD_B_D8: instructions.ld_r8_n(cpu, 'b'); break;
        case alias.RLCA: instructions.rlca(cpu); break;
        case alias.LD_REF_A16_SP: instructions.ld_ref_nn_r16(cpu, 'sp'); break;
        case alias.ADD_HL_BC: instructions.add_r16_r16(cpu, 'hl', 'bc'); break;
        case alias.LD_A_REF_BC: instructions.ld_r8_ref_r16(cpu, 'a', 'bc'); break;
        case alias.DEC_BC: instructions.dec_r16(cpu, 'bc'); break;
        case alias.INC_C: instructions.inc_r8(cpu, 'c'); break;
        case alias.DEC_C: instructions.dec_r8(cpu, 'c'); break;
        case alias.LD_C_D8: instructions.ld_r8_n(cpu, 'c'); break;
        case alias.RRCA: instructions.rrca(cpu); break;

        // 0x1z
        case alias.STOP_0: console.log("STOPPING"); break;
        case alias.LD_DE_D16: instructions.ld_r16_nn(cpu, 'de'); break;
        case alias.LD_REF_DE_A: instructions.ld_ref_r16_r8(cpu, 'de' ,'a'); break;
        case alias.INC_DE: instructions.inc_r16(cpu, 'de'); break;
        case alias.INC_D: instructions.inc_r8(cpu, 'd'); break;
        case alias.DEC_D: instructions.dec_r8(cpu, 'd'); break;
        case alias.LD_D_D8: instructions.ld_r8_n(cpu, 'd'); break;
        case alias.RLA: instructions.rla(cpu); break;
        case alias.JR_R8: instructions.jr_r8(cpu); break;
        case alias.ADD_HL_DE: instructions.add_r16_r16(cpu, 'hl', 'de'); break;
        case alias.LD_A_REF_DE: instructions.ld_r8_ref_r16(cpu, 'a', 'bc'); break;
        case alias.DEC_DE: instructions.dec_r16(cpu, 'de'); break;
        case alias.INC_E: instructions.inc_r8(cpu, 'e'); break;
        case alias.DEC_E: instructions.dec_r8(cpu, 'e'); break;
        case alias.LD_E_D8: instructions.ld_r8_n(cpu, 'e'); break;
        case alias.RRA: instructions.rra(cpu); break;

        // 0x2z
        case alias.JR_NZ_R8: instructions.jr_nz_r8(cpu); break;
        case alias.LD_HL_D16: instructions.ld_r16_nn(cpu, 'hl'); break;
        case alias.LD_REF_HL_PLUS_A: instructions.ld_ref_r16_plus_r8(cpu, 'hl', 'a'); break;
        case alias.INC_HL: instructions.inc_r16(cpu, 'hl'); break;
        case alias.INC_H: instructions.inc_r8(cpu, 'h'); break;
        case alias.DEC_H: instructions.dec_r8(cpu, 'h'); break;
        case alias.LD_H_D8: instructions.ld_r8_n(cpu, 'h'); break;
        case alias.DAA: instructions.daa(cpu); break;
        case alias.JR_Z_R8: instructions.jr_z_r8(cpu); break;
        case alias.ADD_HL_HL: instructions.add_r16_r16(cpu, 'hl', 'de'); break;
        case alias.LD_A_REF_HL_PLUS: instructions.ld_r8_ref_r16_plus(cpu, 'hl', 'a'); break;
        case alias.DEC_HL: instructions.dec_r16(cpu, 'hl'); break;
        case alias.INC_L: instructions.inc_r8(cpu, 'l'); break;
        case alias.DEC_L: instructions.dec_r8(cpu, 'l'); break;
        case alias.LD_L_D8: instructions.ld_r8_n(cpu, 'l'); break;
        case alias.CPL: instructions.cpl(cpu, 'a'); break;

        // 0x3z
        case alias.JR_NC_R8: instructions.jr_nc_r8(cpu); break;
        case alias.LD_SP_D16: instructions.ld_r16_nn(cpu, 'sp'); break;
        case alias.LD_REF_HL_MINUS_A: instructions.ld_ref_r16_minus_r8(cpu, 'hl', 'a'); break;
        case alias.INC_SP: instructions.inc_r16(cpu, 'sp'); break;
        case alias.INC_REF_HL: instructions.inc_ref_r16(cpu, 'hl'); break;
        case alias.DEC_REF_HL: instructions.dec_ref_r16(cpu, 'hl'); break;
        case alias.LD_REF_HL_D8: instructions.ld_ref_r16_d8(cpu, 'hl'); break;
        case alias.SCF: instructions.scf(cpu); break;
        case alias.JR_C_R8: instructions.jr_c_r8(cpu); break;
        case alias.ADD_HL_SP: instructions.add_r16_r16(cpu, 'hl', 'de'); break;
        case alias.LD_A_REF_HL_MINUS: instructions.ld_r8_ref_r16_minus(cpu, 'hl', 'a'); break;
        case alias.DEC_SP: instructions.dec_r16(cpu, 'sp'); break;
        case alias.INC_A: instructions.inc_r8(cpu, 'a'); break;
        case alias.DEC_A: instructions.dec_r8(cpu, 'a'); break;
        case alias.LD_A_D8: instructions.ld_r8_n(cpu, 'b'); break;
        case alias.CCF: instructions.ccf(cpu); break;


        // 0x4z
        case alias.LD_B_B: instructions.ld_r8_r8(cpu, 'b', 'b'); break;
        case alias.LD_B_C: instructions.ld_r8_r8(cpu, 'b', 'c'); break;
        case alias.LD_B_D: instructions.ld_r8_r8(cpu, 'b', 'd'); break;
        case alias.LD_B_E: instructions.ld_r8_r8(cpu, 'b', 'e'); break;
        case alias.LD_B_H: instructions.ld_r8_r8(cpu, 'b', 'h'); break;
        case alias.LD_B_L: instructions.ld_r8_r8(cpu, 'b', 'l'); break;
        case alias.LD_B_REF_HL: instructions.ld_r8_ref_r16(cpu, 'b', 'hl'); break;
        case alias.LD_B_A: instructions.ld_r8_r8(cpu, 'b', 'a'); break;
        case alias.LD_C_B: instructions.ld_r8_r8(cpu, 'c', 'b'); break;
        case alias.LD_C_C: instructions.ld_r8_r8(cpu, 'c', 'c'); break;
        case alias.LD_C_D: instructions.ld_r8_r8(cpu, 'c', 'd'); break;
        case alias.LD_C_E: instructions.ld_r8_r8(cpu, 'c', 'e'); break;
        case alias.LD_C_H: instructions.ld_r8_r8(cpu, 'c', 'h'); break;
        case alias.LD_C_L: instructions.ld_r8_r8(cpu, 'c', 'l'); break;
        case alias.LD_C_REF_HL: instructions.ld_r8_ref_r16(cpu, 'c', 'hl'); break;
        case alias.LD_C_A: instructions.ld_r8_r8(cpu, 'c', 'a'); break;

        // 0x5z
        case alias.LD_D_B: instructions.ld_r8_r8(cpu, 'd', 'b'); break;
        case alias.LD_D_C: instructions.ld_r8_r8(cpu, 'd', 'c'); break;
        case alias.LD_D_D: instructions.ld_r8_r8(cpu, 'd', 'd'); break;
        case alias.LD_D_E: instructions.ld_r8_r8(cpu, 'd', 'e'); break;
        case alias.LD_D_H: instructions.ld_r8_r8(cpu, 'd', 'h'); break;
        case alias.LD_D_L: instructions.ld_r8_r8(cpu, 'd', 'l'); break;
        case alias.LD_D_REF_HL: instructions.ld_r8_ref_r16(cpu, 'd', 'hl'); break;
        case alias.LD_D_A: instructions.ld_r8_r8(cpu, 'd', 'a'); break;
        case alias.LD_E_B: instructions.ld_r8_r8(cpu, 'e', 'b'); break;
        case alias.LD_E_C: instructions.ld_r8_r8(cpu, 'e', 'c'); break;
        case alias.LD_E_D: instructions.ld_r8_r8(cpu, 'e', 'd'); break;
        case alias.LD_E_E: instructions.ld_r8_r8(cpu, 'e', 'e'); break;
        case alias.LD_E_H: instructions.ld_r8_r8(cpu, 'e', 'h'); break;
        case alias.LD_E_L: instructions.ld_r8_r8(cpu, 'e', 'l'); break;
        case alias.LD_E_REF_HL: instructions.ld_r8_ref_r16(cpu, 'e', 'hl'); break;
        case alias.LD_E_A: instructions.ld_r8_r8(cpu, 'e', 'a'); break;

        // 0x6z
        case alias.LD_H_B: instructions.ld_r8_r8(cpu, 'h', 'b'); break;
        case alias.LD_H_C: instructions.ld_r8_r8(cpu, 'h', 'c'); break;
        case alias.LD_H_D: instructions.ld_r8_r8(cpu, 'h', 'd'); break;
        case alias.LD_H_E: instructions.ld_r8_r8(cpu, 'h', 'e'); break;
        case alias.LD_H_H: instructions.ld_r8_r8(cpu, 'h', 'h'); break;
        case alias.LD_H_L: instructions.ld_r8_r8(cpu, 'h', 'l'); break;
        case alias.LD_H_REF_HL: instructions.ld_r8_ref_r16(cpu, 'h', 'hl'); break;
        case alias.LD_H_A: instructions.ld_r8_r8(cpu, 'h', 'a'); break;
        case alias.LD_L_B: instructions.ld_r8_r8(cpu, 'l', 'b'); break;
        case alias.LD_L_C: instructions.ld_r8_r8(cpu, 'l', 'c'); break;
        case alias.LD_L_D: instructions.ld_r8_r8(cpu, 'l', 'd'); break;
        case alias.LD_L_E: instructions.ld_r8_r8(cpu, 'l', 'e'); break;
        case alias.LD_L_H: instructions.ld_r8_r8(cpu, 'l', 'h'); break;
        case alias.LD_L_L: instructions.ld_r8_r8(cpu, 'l', 'l'); break;
        case alias.LD_L_REF_HL: instructions.ld_r8_ref_r16(cpu, 'l', 'hl'); break;
        case alias.LD_L_A: instructions.ld_r8_r8(cpu, 'l', 'a'); break;

        // 0x7z
        case alias.LD_REF_HL_B: instructions.ld_ref_r16_r8(cpu, 'hl' ,'b'); break;
        case alias.LD_REF_HL_C: instructions.ld_ref_r16_r8(cpu, 'hl' ,'c'); break;
        case alias.LD_REF_HL_D: instructions.ld_ref_r16_r8(cpu, 'hl' ,'d'); break;
        case alias.LD_REF_HL_E: instructions.ld_ref_r16_r8(cpu, 'hl' ,'e'); break;
        case alias.LD_REF_HL_H: instructions.ld_ref_r16_r8(cpu, 'hl' ,'h'); break;
        case alias.LD_REF_HL_L: instructions.ld_ref_r16_r8(cpu, 'hl' ,'l'); break;
        case alias.HALT: console.log("HALT"); break;
        case alias.LD_REF_HL_A: instructions.ld_ref_r16_r8(cpu, 'hl' ,'a'); break;
        case alias.LD_A_B: instructions.ld_r8_r8(cpu, 'a', 'b'); break;
        case alias.LD_A_C: instructions.ld_r8_r8(cpu, 'a', 'c'); break;
        case alias.LD_A_D: instructions.ld_r8_r8(cpu, 'a', 'd'); break;
        case alias.LD_A_E: instructions.ld_r8_r8(cpu, 'a', 'e'); break;
        case alias.LD_A_REF_HL: instructions.ld_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.LD_A_H: instructions.ld_r8_r8(cpu, 'a', 'h'); break;
        case alias.LD_A_L: instructions.ld_r8_r8(cpu, 'a', 'l'); break;
        case alias.LD_A_A: instructions.ld_r8_r8(cpu, 'a', 'a'); break;

        // 0x8z
        case alias.ADD_A_B: instructions.add_r8_r8(cpu, 'a', 'b'); break;
        case alias.ADD_A_C: instructions.add_r8_r8(cpu, 'a', 'c'); break;
        case alias.ADD_A_D: instructions.add_r8_r8(cpu, 'a', 'd'); break;
        case alias.ADD_A_E: instructions.add_r8_r8(cpu, 'a', 'e'); break;
        case alias.ADD_A_H: instructions.add_r8_r8(cpu, 'a', 'h'); break;
        case alias.ADD_A_L: instructions.add_r8_r8(cpu, 'a', 'l'); break;
        case alias.ADD_A_REF_HL: instructions.add_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.ADD_A_A: instructions.add_r8_r8(cpu, 'a', 'a'); break;
        case alias.ADC_A_B: instructions.adc_r8_r8(cpu, 'a', 'b'); break;
        case alias.ADC_A_C: instructions.adc_r8_r8(cpu, 'a', 'c'); break;
        case alias.ADC_A_D: instructions.adc_r8_r8(cpu, 'a', 'd'); break;
        case alias.ADC_A_E: instructions.adc_r8_r8(cpu, 'a', 'e'); break;
        case alias.ADC_A_H: instructions.adc_r8_r8(cpu, 'a', 'h'); break;
        case alias.ADC_A_L: instructions.adc_r8_r8(cpu, 'a', 'l'); break;
        case alias.ADC_A_REF_HL: instructions.adc_r8_ref_r16(cpu, 'a', 'l'); break;
        case alias.ADC_A_A: instructions.adc_r8_r8(cpu, 'a', 'a'); break;

        // 0x9z
        case alias.SUB_B: instructions.sub_r8_r8(cpu, 'a', 'b'); break;
        case alias.SUB_C: instructions.sub_r8_r8(cpu, 'a', 'c'); break;
        case alias.SUB_D: instructions.sub_r8_r8(cpu, 'a', 'd'); break;
        case alias.SUB_E: instructions.sub_r8_r8(cpu, 'a', 'e'); break;
        case alias.SUB_H: instructions.sub_r8_r8(cpu, 'a', 'h'); break;
        case alias.SUB_L: instructions.sub_r8_r8(cpu, 'a', 'l'); break;
        case alias.SUB_REF_HL: instructions.sub_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.SUB_A: instructions.sub_r8_r8(cpu, 'a', 'a'); break;
        case alias.SBC_A_B: instructions.sbc_r8_r8(cpu, 'a', 'b'); break;
        case alias.SBC_A_C: instructions.sbc_r8_r8(cpu, 'a', 'c'); break;
        case alias.SBC_A_D: instructions.sbc_r8_r8(cpu, 'a', 'd'); break;
        case alias.SBC_A_E: instructions.sbc_r8_r8(cpu, 'a', 'e'); break;
        case alias.SBC_A_H: instructions.sbc_r8_r8(cpu, 'a', 'h'); break;
        case alias.SBC_A_L: instructions.sbc_r8_r8(cpu, 'a', 'l'); break;
        case alias.SBC_A_REF_HL: instructions.sbc_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.SBC_A_A: instructions.sbc_r8_r8(cpu, 'a', 'a'); break;

        // 0xaz
        case alias.AND_B: instructions.and_r8_r8(cpu, 'a', 'b'); break;
        case alias.AND_C: instructions.and_r8_r8(cpu, 'a', 'c'); break;
        case alias.AND_D: instructions.and_r8_r8(cpu, 'a', 'd'); break;
        case alias.AND_E: instructions.and_r8_r8(cpu, 'a', 'e'); break;
        case alias.AND_H: instructions.and_r8_r8(cpu, 'a', 'h'); break;
        case alias.AND_L: instructions.and_r8_r8(cpu, 'a', 'l'); break;
        case alias.AND_REF_HL: instructions.and_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.AND_A: instructions.and_r8_r8(cpu, 'a', 'a'); break;
        case alias.XOR_B: instructions.xor_r8_r8(cpu, 'a', 'b'); break;
        case alias.XOR_C: instructions.xor_r8_r8(cpu, 'a', 'c'); break;
        case alias.XOR_D: instructions.xor_r8_r8(cpu, 'a', 'd'); break;
        case alias.XOR_E: instructions.xor_r8_r8(cpu, 'a', 'e'); break;
        case alias.XOR_H: instructions.xor_r8_r8(cpu, 'a', 'h'); break;
        case alias.XOR_L: instructions.xor_r8_r8(cpu, 'a', 'l'); break;
        case alias.XOR_REF_HL: instructions.xor_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.XOR_A: instructions.xor_r8_r8(cpu, 'a', 'a'); break;

        // 0xbz
        case alias.OR_B: instructions.or_r8_r8(cpu, 'a', 'b'); break;
        case alias.OR_C: instructions.or_r8_r8(cpu, 'a', 'c'); break;
        case alias.OR_D: instructions.or_r8_r8(cpu, 'a', 'd'); break;
        case alias.OR_E: instructions.or_r8_r8(cpu, 'a', 'e'); break;
        case alias.OR_H: instructions.or_r8_r8(cpu, 'a', 'h'); break;
        case alias.OR_L: instructions.or_r8_r8(cpu, 'a', 'l'); break;
        case alias.OR_REF_HL: instructions.or_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.OR_A: instructions.or_r8_r8(cpu, 'a', 'a'); break;
        case alias.CP_B: instructions.cp_r8_r8(cpu, 'a', 'b'); break;
        case alias.CP_C: instructions.cp_r8_r8(cpu, 'a', 'c'); break;
        case alias.CP_D: instructions.cp_r8_r8(cpu, 'a', 'd'); break;
        case alias.CP_E: instructions.cp_r8_r8(cpu, 'a', 'e'); break;
        case alias.CP_H: instructions.cp_r8_r8(cpu, 'a', 'h'); break;
        case alias.CP_L: instructions.cp_r8_r8(cpu, 'a', 'l'); break;
        case alias.CP_REF_HL: instructions.cp_r8_ref_r16(cpu, 'a', 'hl'); break;
        case alias.CP_A: instructions.cp_r8_r8(cpu, 'a', 'a'); break;

        // 0xcz
        case alias.RET_NZ: instructions.ret_nz(cpu); break;
        case alias.POP_BC: instructions.pop_r16(cpu, 'bc'); break;
        case alias.JP_NZ_A16: instructions.jp_nz_a16(cpu); break;
        case alias.JP_A16: instructions.jp_a16(cpu); break;
        case alias.CALL_NZ_A16: instructions.call_nz_a16(cpu); break;
        case alias.PUSH_BC: instructions.push_r16(cpu, 'bc'); break;
        case alias.ADD_A_D8: instructions.add_r8_d8(cpu, 'a'); break;
        case alias.RST_00H: instructions.rst_n(cpu, 0x0); break;
        case alias.RET_Z: instructions.ret_z(cpu); break;
        case alias.RET: instructions.ret(cpu); break;
        case alias.JP_Z_A16: instructions.jp_z_a16(cpu); break;
        case alias.PREFIX_CB: console.log("prefix cb"); break;
        case alias.CALL_Z_A16: instructions.call_z_a16(cpu); break;
        case alias.CALL_A16: instructions.call_a16(cpu); break;
        case alias.ADC_A_D8: instructions.adc_r8_d8(cpu, 'a'); break;
        case alias.RST_08H: instructions.rst_n(cpu, 0x08); break;

        // 0xdz
        case alias.RET_NC: instructions.ret_nc(cpu); break;
        case alias.POP_BC: instructions.pop_r16(cpu, 'de'); break;
        case alias.JP_NZ_A16: instructions.jp_nc_a16(cpu); break;
        case 0xD3: throw new Error("0xD3 does not exists"); break;
        case alias.CALL_NC_A16: instructions.call_nc_a16(cpu); break;
        case alias.PUSH_DE: instructions.push_r16(cpu, 'de'); break;
        case alias.SUB_D8: instructions.sub_r8_d8(cpu, 'a'); break;
        case alias.RST_10H: instructions.rst_n(cpu, 0x10); break;
        case alias.RET_C: instructions.ret_c(cpu); break;
        case alias.RETI: instructions.reti(cpu); break;
        case alias.JP_C_A16: instructions.jp_c_a16(cpu); break;
        case 0xDB: throw new Error("0xDB does not exists"); break;
        case alias.CALL_C_A16: instructions.call_c_a16(cpu); break;
        case alias.SBC_D8: instructions.sbc_r8_d8(cpu, 'a'); break;
        case alias.RST_18H: instructions.rst_n(cpu, 0x18); break;

        default: throw Error(`${instructions} => NOT IMPLEMENTED`); break;
    }
}
