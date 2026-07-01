export enum UserType {
  STUDENT = 0,
  TEACHER = 1,
  PARENT = 2,
  COACH = 3,
}

export const USER_TYPES = [
  {
    label: 'Student',
    value: UserType.STUDENT,
  },
  {
    label: 'Teacher',
    value: UserType.TEACHER,
  },
  {
    label: 'Parent',
    value: UserType.PARENT,
  },
  {
    label: 'Coach',
    value: UserType.COACH,
  },
];
