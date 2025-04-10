import { Edit } from './shared/icons/Edit';
import { Trash } from './shared/icons/Trash';

type ComapanyNameProps = {
  name: string;
};

export const ComapanyName = ({ name }: ComapanyNameProps) => {
  return (
    <div className="content__company-name-wrapper">
      <span className="content__company-name">{name}</span>
      <div className="content__icons-wrapper">
        <div>
          <Edit width={20} height={20} />
        </div>
        <div>
          <Trash color="red" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};
