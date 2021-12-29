const CreateAsciiMatrix = (matrix) => {
  let asciiMatrix = "";

  // Cria o separador de linha com o mesmo numero das colunas no board
  let separator = "+" + "---+".repeat(matrix[0].length) + "\n";

  asciiMatrix += separator;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let element = matrix[i][j] ? matrix[i][j] : "-";
      asciiMatrix += `| ${element} `;
    }
    asciiMatrix += `|\n${separator}`;
  }

  return asciiMatrix;
};

export default CreateAsciiMatrix;
