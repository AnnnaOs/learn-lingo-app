import TeacherCard from '../TeacherCard/TeacherCard';

const TeachersList = ({ teachers, onOpenModal, selectedLevel }) => {
  return (
    <ul className="teachersList">
      {teachers.map(teacher => (
        <li key={teacher.id}>
          <TeacherCard
            teacher={teacher}
            onOpenModal={onOpenModal}
            selectedLevel={selectedLevel}
          />
        </li>
      ))}
    </ul>
  );
};

export default TeachersList;
