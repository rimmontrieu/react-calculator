import { SyntheticEvent, useRef, useState } from "react";

const Calculator = () => {
  
  // Operand list
  const [list, setList] = useState<string[]>(['0']);
  const result = useRef<string>('0');

  const getType = (op:string) => isNaN(parseFloat(op)) ? 'operator' : 'number';
  
  const onClickHandler = (e:SyntheticEvent) => {

    const target = e.target;

    if (target instanceof HTMLLIElement) {

      const className = target.className;
      let lastOp = list[list.length - 1];

      // Number type
      if (className == '') {
        
        // Construct current number
        if (getType(lastOp) == 'number') {

          if (lastOp == '0') lastOp = '';
          list[list.length - 1] = lastOp + target.innerHTML;
        }
        else list.push(target.innerHTML);
      }
      // Operator type
      else if (className == 'operator') {
        if (getType(lastOp) == 'operator') 
          list[list.length - 1] = target.dataset.op!;
        else list.push(target.dataset.op!);
      }
      // Clear type
      else if (className == 'clear') {
        list.splice(0);
        list.push('0');
      }
      // Decimal type
      else {
        if (getType(lastOp) == 'operator') 
          list.push('0.');
        else if (lastOp.indexOf('.') < 0) 
          list[list.length - 1] = lastOp + '.';
      }

      // Calculate temporary value
      try {
        result.current = eval(list.join(' ')); // Ok to use eval with static input
      } catch (e) {
        result.current = 'NaN';
      }
      setList([...list]);
    }
  }

  return (
    <div className='text-2xl bg-gray-800 p-4 w-80 mx-auto rounded-lg py-8'> 
      <div className='h-12 pb-1 overflow-y-auto'>{list.join(' ')}</div>
      <div className='font-bold text-right px-4'>{result.current}</div>
      <div className='cursor-pointer mt-4'>
        <ul className='numpad flex flex-wrap gap-2' onClick={e => onClickHandler(e)}>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li className='operator' data-op='/'>&#247;</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li className='operator' data-op='*'>&#10005;</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li className='operator' data-op='-'>&#8722;</li>
          <li>0</li>
          <li className='clear'>AC</li>
          <li className='decimal'>,</li>
          <li className='operator' data-op='+'>&#43;</li>
        </ul>
      </div>
    </div>
  )
}

export default Calculator
