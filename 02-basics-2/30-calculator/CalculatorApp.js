import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const result = ref(0);
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const operator = ref(null);

    const errorMessage = ref('');
    
    watch(operator, () => {
      calculate();
    });
    
    watch(firstOperand, () => {
      calculate();
    });
    
    watch(secondOperand, () => {
      calculate();
    });
    
    function calculate() {
      errorMessage.value = '';
      
      switch (operator.value) {
        case 'sum': {
          result.value = firstOperand.value + secondOperand.value;
          break;
        }
        case 'subtract': {
          result.value = firstOperand.value - secondOperand.value;
          break;
        }
        case 'multiply': {
          result.value = firstOperand.value * secondOperand.value;
          break;
        }
        case 'divide': {
          if (secondOperand.value === 0) {
            errorMessage.value = 'На ноль делить нельзя!';
            result.value = null;
            return;
          }
          
          result.value = firstOperand.value / secondOperand.value;
          break;
        }
      }
    }
    
    return {
      result,
      operator,
      firstOperand,
      secondOperand,
      
      errorMessage
    }},


  template: `
    <div class="calculator">
    <input type="number" aria-label="First operand" v-model="firstOperand" />


      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand" />

      <div>=</div>

      <output>{{ result }}</output>

      <div v-if="errorMessage.length"> {{ errorMessage }} </div>
    </div>
  `,
})