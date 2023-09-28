import React, { FC } from "react";
import { Values } from "./utils";
interface IProps {
  data: Values;
}
const Table: FC<IProps> = (props) => {
  const { data } = props;
  return (
    <div className="main">
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(data).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data["Class 1"]).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              {Object.keys(data).map((classKey) => (
                <td key={classKey}>
                  {Array.isArray(data[classKey][key]) ? (
                    <>{(data[classKey][key] as string[]).join(", ")}</>
                  ) : (
                    data[classKey][key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
